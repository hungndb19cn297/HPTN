package com.example.authentication.service;

import com.example.authentication.entity.FileInfo;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.repository.FilesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
public class FileService {
    @Autowired
    private FilesRepository filesRepository;
    private static final String rootPath = "/var/uploads";
    private static final Set<String> fileExt = new HashSet<>(Arrays.stream(new String[]{"png", "imp", "jpg", "jpeg"}).toList());

    public Integer saveImage(MultipartFile file, Integer id)
            throws IOException {
        try {
            String fileExtension = com.google.common.io.Files.getFileExtension(file.getOriginalFilename());
            if (!fileExt.contains(fileExtension))
                throw new ApiException(ErrorMessage.INVALID_FILE);
            String fileName = id + " " + new Date().getTime();
            saveToStore(file.getInputStream(), fileName, fileExtension);

            FileInfo fileInfo = new FileInfo();
            fileInfo.setPath(rootPath);

            fileInfo.setFileName(String.format("%s.%s", fileName, fileExtension));
            fileInfo.setFileType(fileExtension);
            fileInfo.setFileSize(file.getSize());
            filesRepository.save(fileInfo);

            return fileInfo.getId();
        } catch (Exception e) {
            log.error(e.toString());
            throw e;
        }
    }
    private void saveToStore(InputStream fileStream, String fileName, String fileExtension) throws IOException {
        // Check folder and file
        Path root = Paths.get(rootPath);
        if (!Files.exists(root))
            Files.createDirectories(root);

        Path filePath = Paths.get(String.format("%s/%s.%s", rootPath, fileName, fileExtension));
        if (Files.exists(filePath))
            Files.delete(filePath);

        // Copy file
        Files.copy(fileStream, filePath);
        fileStream.close();
    }

    public void deleteFile(FileInfo fileInfo) {
        if (fileInfo == null)
            return;
        try {
            if (fileInfo.getFileName() != null) {
                String fileName = fileInfo.getFileName();
                Path file = Paths.get(String.format("%s/%s", fileInfo.getPath(), fileName));
                Files.deleteIfExists(file);
            }
        } catch (IOException e) {
            log.error("[deleteFileFail] " + fileInfo, e);
        }
    }

    public Mono<Resource> streamFile(Integer fileId) throws IOException {
        FileInfo fileInfo = filesRepository.findOneById(fileId);
        if (fileInfo == null)
            throw new ApiException(ErrorMessage.INVALID_ID, fileId);
        String fileName = fileInfo.getFileName();
        Path file = Paths.get(String.format("%s/%s", fileInfo.getPath(), fileName));
        return getResourceMono(file);
    }

    private Mono<Resource> getResourceMono(Path filePath) throws IOException {
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists())
            throw new ApiException(ErrorMessage.FILE_NOT_EXISTS, filePath.toUri());
        if (!resource.isReadable())
            throw new ApiException(ErrorMessage.FILE_NOT_READABLE, filePath.toUri());
        return Mono.fromSupplier(() -> resource);
    }
}
