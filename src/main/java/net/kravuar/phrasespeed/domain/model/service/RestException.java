package net.kravuar.phrasespeed.domain.model.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class RestException extends RuntimeException {
    private final Object[] info;
    private final HttpStatus status;
    private final String message;

    public List<Pair<String, Object[]>> getMessages() {
        var messages = new ArrayList<Pair<String, Object[]>>();
        messages.add(0, Pair.of(message, info));
        return messages;
    }

    public HttpStatus getCode() {
        return status;
    }
}