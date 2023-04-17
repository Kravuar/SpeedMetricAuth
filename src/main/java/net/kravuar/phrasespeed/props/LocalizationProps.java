package net.kravuar.phrasespeed.props;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@ConfigurationProperties(prefix = "app.i18n")
@Validated
public record LocalizationProps (
        @Size(min = 1)
        List<@NotBlank String> supportedLocales,
        @NotBlank String defaultLocale
) {}