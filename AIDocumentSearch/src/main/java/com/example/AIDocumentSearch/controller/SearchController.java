package com.example.AIDocumentSearch.controller;

import com.example.AIDocumentSearch.model.FileQuery;
import com.example.AIDocumentSearch.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController

public class SearchController {

    @Autowired
    SearchService service;

    @PostMapping("/upload")
    public void upload(@RequestParam MultipartFile file)
    {

        service.upload(file);



    }

    @PostMapping("/query")
    public String query(@RequestBody String query)
    {
        System.out.println("hello world");
        String res=service.query(query);
        System.out.println(res);
        return res;

    }


}
