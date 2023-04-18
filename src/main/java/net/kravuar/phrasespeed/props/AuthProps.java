package net.kravuar.phrasespeed.props;

import jakarta.validation.constraints.Min;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "app.web")
@Validated
public record AuthProps(
        @Min(1) int loginAttempts,
        @Min(1) int sessionTimeout,
        @Min(0) double passwordEpsilon
) {}