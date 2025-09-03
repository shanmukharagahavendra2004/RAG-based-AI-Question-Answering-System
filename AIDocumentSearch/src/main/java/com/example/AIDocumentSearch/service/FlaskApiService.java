package com.example.AIDocumentSearch.service;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service


public class FlaskApiService {

    private final WebClient webClient=WebClient.builder()
            .baseUrl("http://127.0.0.1:8000")
            .build();
    public void callFlaskApi(MultipartFile file)
    {
        try {
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", file.getResource());

            webClient.post()
                    .uri("/upload")
                    .contentType(org.springframework.http.MediaType.MULTIPART_FORM_DATA)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        }
        catch(Exception e)
        {
            System.out.println("Error uploading file: "+e.getMessage());
        }
    }

    public String query(String query)
    {
        try{
//           QueryRequest req=new QueryRequest(query);
            String response=webClient.post()
                    .uri("/chat")
                    .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                    .bodyValue(query)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            System.out.println(response);
            return response;



        }
        catch(Exception e)
        {
            return "Error: "+e.getMessage();
        }
    }

}
