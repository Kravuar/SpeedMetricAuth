package net.kravuar.phrasespeed.app;

import net.kravuar.phrasespeed.domain.dto.UserForm;
import net.kravuar.phrasespeed.domain.model.User;
import net.kravuar.phrasespeed.domain.model.service.RestException;
import net.kravuar.phrasespeed.props.AuthProps;
import org.bson.types.Binary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
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
        return userRepo.insert(new User(userForm.username(), toBinary(userForm.password()), userForm.metric(), userForm.deviations()));
    }
    public String login(UserForm userForm) {
        var user = userRepo.findByUsername(userForm.username());

        if (user == null)
            throw new RestException(new Object[]{userForm.username()}, HttpStatus.NOT_FOUND, "exception.userNotFound");

        if (!user.getPassword().equals(toBinary(userForm.password())))
            throw new RestException(new Object[]{userForm.username()}, HttpStatus.FORBIDDEN, "exception.credentials");

        if (!validateMetric(user, userForm))
            throw new RestException(new Object[]{userForm.username()}, HttpStatus.FORBIDDEN, "exception.wrongMetric");

        return getTokenFor(user);
    }


    private boolean validateMetric(User user, UserForm userForm) {
//        processes ideal metric and deviations, compares to authProps.epsilon

        return false;
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