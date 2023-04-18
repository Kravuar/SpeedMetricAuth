package net.kravuar.phrasespeed.app;

import net.kravuar.phrasespeed.domain.dto.UserForm;
import net.kravuar.phrasespeed.domain.model.Password;
import net.kravuar.phrasespeed.domain.model.User;
import net.kravuar.phrasespeed.domain.model.service.RestException;
import net.kravuar.phrasespeed.props.AuthProps;
import org.bson.types.Binary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class AuthService {
    private final UserRepo userRepo;
    private final MessageDigest md;
    private final AuthProps authProps;

    public AuthService(UserRepo userRepo, AuthProps authProps) throws NoSuchAlgorithmException {
        this.userRepo = userRepo;
        this.authProps = authProps;
        this.md = MessageDigest.getInstance("SHA-1");
    }

    public User signup(UserForm userForm) {
        return userRepo.insert(new User(
                userForm.getUsername(),
                new Password(toBinary(userForm.getPassword()),
                             userForm.getMetric(),
                             userForm.getDeviation()))
        );
    }
    public String login(UserForm userForm) {
        var user = userRepo.findByUsername(userForm.getUsername());
        var inputPassword = new Password(toBinary(userForm.getPassword()),
                userForm.getMetric(),
                userForm.getDeviation());

        if (user == null)
            throw new RestException(new Object[]{userForm.getUsername()}, HttpStatus.NOT_FOUND, "exception.userNotFound");
        if (!user.getPassword().equals(inputPassword))
            throw new RestException(new Object[]{userForm.getUsername()}, HttpStatus.FORBIDDEN, "exception.credentials");
        if (!validateMetric(user.getPassword(), inputPassword))
            throw new RestException(new Object[]{userForm.getUsername()}, HttpStatus.FORBIDDEN, "exception.wrongMetric");

        return getTokenFor(user);
    }

    private boolean validateMetric(Password ideal, Password input) {
        return Math.abs(ideal.metric() - input.metric()) < authProps.passwordEpsilon()
                && Math.abs(ideal.deviation() - input.deviation()) < authProps.passwordEpsilon();
    }
    private Binary toBinary(String password) {
        return toBinary(password.getBytes());
    }
    private Binary toBinary(byte[] bytes) {
        return new Binary(md.digest(bytes));
    }
    private String getTokenFor(User user) {
        return "He-he, no token, he-he";
    }
}