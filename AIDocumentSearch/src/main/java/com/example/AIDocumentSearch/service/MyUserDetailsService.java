package com.example.AIDocumentSearch.service;

import com.example.AIDocumentSearch.model.UserPrincipal;
import com.example.AIDocumentSearch.model.Users;
import com.example.AIDocumentSearch.repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws
            UsernameNotFoundException {
        Users user=repo.findByUserName(username);
        if(user==null)
        {
            throw new UsernameNotFoundException("User not found");
        }
        return new UserPrincipal(user);
    }

}
