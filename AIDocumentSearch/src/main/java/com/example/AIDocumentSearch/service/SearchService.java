package com.example.AIDocumentSearch.service;
import com.example.AIDocumentSearch.service.FlaskApiService;
import com.example.AIDocumentSearch.model.FileQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Service

public class SearchService {

    @Autowired
    FlaskApiService service;

    public void upload(MultipartFile file)
    {

        service.callFlaskApi(file);
    }

    public String query(String query)
    {
        System.out.println("welcome");
        return service.query(query);

    }




}
