package com.reset.spring_backend.persistence.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.reset.spring_backend.persistence.entity.User;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long> {
}