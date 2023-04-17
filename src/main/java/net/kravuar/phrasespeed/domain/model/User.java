package net.kravuar.phrasespeed.domain.model;

import jakarta.validation.constraints.Size;
import lombok.Data;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("users")
@Data
public class User {
    @Id
    private ObjectId id;
    @Indexed(unique = true)
    @Size(min = 5, max = 20)
    private String username;
    private Binary password;
    private double metric;
    private double[] deviations;

    public User(String username, Binary password, double metric, double[] deviations) {
        this.username = username;
        this.password = password;
        this.metric = metric;
        this.deviations = deviations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return username.equals(user.username) && password.equals(user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }
}