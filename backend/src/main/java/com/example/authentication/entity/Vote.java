package com.example.authentication.entity;

import com.example.authentication.entity.CRUEntity;
import com.example.authentication.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "votes")
public class Vote extends CRUEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private Integer postId;
    private Integer userId;
    // -1 (DOWN) 0 (NONE) 1 (UP)
    private Integer vote;
}
