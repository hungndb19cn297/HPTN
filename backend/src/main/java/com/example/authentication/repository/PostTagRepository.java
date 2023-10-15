package com.example.authentication.repository;

import com.example.authentication.entity.Post;
import com.example.authentication.entity.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Integer> {
}
