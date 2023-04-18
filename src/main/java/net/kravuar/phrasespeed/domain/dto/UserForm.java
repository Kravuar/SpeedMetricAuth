package net.kravuar.phrasespeed.domain.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import net.kravuar.phrasespeed.domain.model.service.RestException;
import org.springframework.http.HttpStatus;

import java.util.Arrays;

@Getter
public class UserForm {
        private final String username;
        private final String password;
        private final double metric;
        private final double deviation;
        public UserForm(@Size(min = 5, max = 20, message = "validation.username") String username,
                        @Size(min = 10, message = "validation.password") String password,
                        double[] intervals
        ) {
                if (intervals.length != password.length() - 1)
                        throw new RestException(new Object[]{username}, HttpStatus.BAD_REQUEST, "exception.badForm");

                this.username = username;
                this.password = password;
                this.metric = Arrays.stream(intervals).average().orElse(0);
                this.deviation = Arrays.stream(intervals).map(interval -> this.metric - interval).average().orElse(0);
        }
}