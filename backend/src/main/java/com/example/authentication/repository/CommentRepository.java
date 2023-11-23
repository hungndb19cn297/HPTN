package com.example.authentication.repository;

import com.example.authentication.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Integer countByPostIdAndDeletedAt(Integer id, Date deletedAt);
    Integer countByCreatedByAndDeletedAt(Integer id, Date deletedAt);

    List<Comment> findAllByPostId(Integer postId);

    List<Comment> findAllByPostIdOrderByCreatedAt(Integer postId);

    List<Comment> findAllByPostIdOrderById(Integer postId);

    Comment findOneByCreatedByAndId(Integer userId, Integer commentId);

    void deleteAllByParentId(Integer commentId);

    @Query("Select count(*) from Comment v where v.post.id = :id and v.createdAt >= :startDate and v.deletedAt is null")
    Integer countByPostIdAndDeletedAtFromDate(Integer id, Date startDate);
}
