package net.kravuar.phrasespeed.domain.model;

import org.bson.types.Binary;

import java.util.Objects;

public record Password (
        Binary password,
        double metric,
        double deviation
) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Password password1 = (Password) o;
        return password.equals(password1.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(password);
    }
}
