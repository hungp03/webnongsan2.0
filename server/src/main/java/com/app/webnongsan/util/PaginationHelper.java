package com.app.webnongsan.util;

import com.app.webnongsan.domain.response.PaginationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class PaginationHelper {
    public <T> PaginationDTO fetchAllEntities(
            Specification<T> specification,
            Pageable pageable,
            JpaSpecificationExecutor<T> repository) {

        Page<T> entities = repository.findAll(specification, pageable);

        PaginationDTO rs = new PaginationDTO();
        PaginationDTO.Meta meta = new PaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(entities.getTotalPages());
        meta.setTotal(entities.getTotalElements());

        rs.setMeta(meta);
        rs.setResult(entities.getContent());
        return rs;
    }
}
