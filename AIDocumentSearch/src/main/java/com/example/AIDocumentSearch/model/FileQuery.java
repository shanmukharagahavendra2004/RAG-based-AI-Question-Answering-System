package com.example.AIDocumentSearch.model;

import org.springframework.web.multipart.MultipartFile;

public class FileQuery {

    private MultipartFile file;
    private String query;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
