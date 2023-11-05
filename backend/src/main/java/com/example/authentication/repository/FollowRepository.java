package com.example.authentication.repository;

import com.example.authentication.entity.Follow;
import com.example.authentication.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Integer countByToUserId(Integer userId);

    Follow findOneByFromUserIdAndToUserId(Integer fromId, Integer toId);
}
