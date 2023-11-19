package com.example.authentication.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tags")
@AllArgsConstructor
@NoArgsConstructor
public class Tag extends CRUEntity{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<PostTag> postTags;

    public Tag(Integer id) {
        this.id = id;
    }
}
