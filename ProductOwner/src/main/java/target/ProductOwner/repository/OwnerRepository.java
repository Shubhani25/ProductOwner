package target.ProductOwner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import target.ProductOwner.model.Owner;

import java.util.Optional;


public interface OwnerRepository extends JpaRepository<Owner, Long> {

    Owner findByProductId(Long id);
}
