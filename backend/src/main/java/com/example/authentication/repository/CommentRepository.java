package com.example.authentication.repository;

import com.example.authentication.entity.Comment;
import com.example.authentication.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Integer countByPostId(Integer id);
}
