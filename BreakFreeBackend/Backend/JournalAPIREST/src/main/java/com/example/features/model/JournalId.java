package com.example.features.model;

import java.io.Serializable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class JournalId implements Serializable {
    private int id_user;
    private String date;

    public void setId_User(int id_user) {
        this.id_user = id_user;
    }

    public int getId_User() {
        return this.id_user;
    }
}