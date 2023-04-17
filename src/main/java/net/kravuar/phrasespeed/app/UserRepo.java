package net.kravuar.phrasespeed.app;

import jakarta.validation.Valid;
import net.kravuar.phrasespeed.domain.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

@Repository
@Validated
public interface UserRepo extends MongoRepository<User, ObjectId> {
    @Valid User findByUsername(String username);
}
