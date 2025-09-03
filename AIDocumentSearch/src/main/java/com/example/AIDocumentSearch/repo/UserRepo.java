package com.example.AIDocumentSearch.repo;

import com.example.AIDocumentSearch.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users,Long> {
    Users findByUserName(String userName);

}
