package com.example.authentication.repository;

import com.example.authentication.entity.Comment;
import com.example.authentication.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Integer countByPostId(Integer id);
    Integer countByCreatedBy(Integer id);

    List<Comment> findAllByPostId(Integer postId);

    List<Comment> findAllByPostIdOrderByCreatedAt(Integer postId);

    List<Comment> findAllByPostIdOrderById(Integer postId);
}
