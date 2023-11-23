package com.example.authentication.repository;

import com.example.authentication.entity.Follow;
import com.example.authentication.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Integer countByToUserId(Integer userId);

    Follow findOneByFromUserIdAndToUserId(Integer fromId, Integer toId);

    @Query("select f from Follow f where f.createdAt > :startDate")
    List<Follow> findAllByCreatedAt(Date startDate);
}
