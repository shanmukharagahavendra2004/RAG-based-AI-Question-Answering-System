package com.example.AIDocumentSearch.service;

import com.example.AIDocumentSearch.model.UserLogin;
import com.example.AIDocumentSearch.model.Users;
import com.example.AIDocumentSearch.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);


    public Users register(Users user)
    {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }
    public String verify(UserLogin user)
    {
        System.out.println(user.getUserName()+" "+user.getPassword());
        Authentication authentication=authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPassword()));
        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUserName());
        else
            return "fail";
    }


}
