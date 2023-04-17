package net.kravuar.phrasespeed.domain.dto;

import jakarta.validation.constraints.Size;

public record UserForm (
        @Size(min = 5, max = 20, message = "validation.username")
        String username,
        @Size(min = 10, message = "validation.password")
        String password,
        double metric,
        double[] deviations
) {}