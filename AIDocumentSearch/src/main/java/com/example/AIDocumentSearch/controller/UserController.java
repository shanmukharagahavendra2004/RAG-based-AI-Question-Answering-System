package com.example.AIDocumentSearch.controller;

import com.example.AIDocumentSearch.model.UserLogin;
import com.example.AIDocumentSearch.model.Users;
import com.example.AIDocumentSearch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService service;
    @PostMapping("/register")
    public String register(@RequestBody Users user)
    {
        System.out.println(user.getUserName()+" "+user.getEmail()+" "+user.getPassword());
        System.out.println("hello");
        service.register(user);
        return "success";
    }

    @PostMapping("/login")
    public UserLogin login(@RequestBody UserLogin user)
    {
        System.out.println("hello");
        service.verify(user);
        return user;
    }

}
