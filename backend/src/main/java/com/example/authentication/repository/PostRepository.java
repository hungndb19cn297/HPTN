package com.example.authentication.repository;

import com.example.authentication.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("""
            Select p1 from Post p1 where p1.id in
            (
                Select p.id from Post p
                left join p.postTags.tag t
                left join p.bookmarks.user u
                left join Follow f on p.createdBy = f.toUser.id and f.fromUser.id = :userId
                where (:id is null or p.id = :id)
                And (:key is null or p.title like %:key% or p.content like %:key%)
                And (-1 in :tagId or t.id in :tagId)
                And (:createdBy is null or p.createdBy = :createdBy)
                And (:isBookmark is null or :isBookmark = false or u.id = :userId)
                And (:isFollow is null or :isFollow = false or (p.createdBy = f.toUser.id and f.fromUser.id = :userId))
                And p.deletedAt is null
            )
            """ )
    Page<Post> searchPost(Integer id,
                          String key,
                          List<Integer> tagId,
                          Boolean isBookmark,
                          Integer createdBy,
                          Integer userId,
                          Boolean isFollow,
                          PageRequest of);

    Integer countByCreatedBy(Integer userId);

    @Query("""
            Select p1 from Post p1 where p1.id in
            (
                Select p.id from Post p
                left join p.bookmarks b
                left join Vote v on p.id = v.postId
                left join p.comments c
                where (b.createdAt >= :startDate
                or (v.createdAt >= :startDate and v.vote != 0)
                or c.createdAt >= :startDate)
                And p.deletedAt is null
                And c.deletedAt is null
            )
            """)
    List<Post> findPostByItemCreatedAt(Date startDate);

    @Query("""
            Select p1 from Post p1 where p1.id in
            (
                Select p.id from Post p
                left join p.bookmarks b
                left join Vote v on p.id = v.postId
                left join p.comments c
                where (b.createdAt >= :startDate
                or v.createdAt >= :startDate
                or c.createdAt >= :startDate
                or p.createdAt >= :startDate)
                And p.deletedAt is null
                And c.deletedAt is null
            )
            """)
    List<Post> findPostByCreatedAt(Date startDate);
}
