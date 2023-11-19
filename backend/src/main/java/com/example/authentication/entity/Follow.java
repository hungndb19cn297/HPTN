package com.example.authentication.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Data
@Entity
@Table(name = "follows")
public class Follow extends CRUEntity{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User toUser;
}
