package net.kravuar.phrasespeed.app;

import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import net.kravuar.phrasespeed.domain.dto.RestMessage;
import net.kravuar.phrasespeed.domain.model.service.RestException;
import net.kravuar.phrasespeed.props.LocalizationProps;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
@RestController
@RequiredArgsConstructor
public class ExceptionAdvice {
    private final MessageSource ms;
    private final LocalizationProps i18nProps;

    private Locale getLocale() {
        return i18nProps.supportedLocales().contains(LocaleContextHolder.getLocale().toLanguageTag())
                ? LocaleContextHolder.getLocale()
                : Locale.forLanguageTag(i18nProps.defaultLocale());
    }

    @ExceptionHandler(RestException.class)
    public ResponseEntity<RestMessage> handleRestException(RestException exception) {
        var locale = getLocale();
        var localized = exception.getMessages().stream()
                .map(message -> ms.getMessage(
                        message.getFirst(),
                        message.getSecond(),
                        locale))
                .toList();

        return new ResponseEntity<>(new RestMessage(localized), exception.getCode());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateKeyException.class)
    public RestMessage handleValidationError() {
        return new RestMessage(List.of(ms.getMessage("db.duplicate", null, getLocale())));
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DataAccessException.class)
    public RestMessage handleValidationError(DataAccessException exception) {
        return new RestMessage(List.of(ms.getMessage("db.unknown", new Object[] {exception.getMessage()}, getLocale())));
    }

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(BindException.class)
    public RestMessage handleValidationError(BindException exception) {
        var locale = getLocale();
        return new RestMessage(exception.getBindingResult()
                .getFieldErrors().stream()
                .filter(error -> error.getDefaultMessage() != null && error.getArguments() != null)
                .map(error -> {
                    var message = error.getDefaultMessage();
                    var args = Arrays.copyOfRange(error.getArguments(), 1, error.getArguments().length);
                    return ms.getMessage(message, args, locale);
                })
                .collect(Collectors.toList()));
    }

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(ConstraintViolationException.class)
    public RestMessage handleValidationError(ConstraintViolationException exception) {
        return new RestMessage(List.of(ms.getMessage("db.unknown", new Object[] {exception.getMessage()}, getLocale())));
        // literally unparsable.
    }
}