package target.ProductOwner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import target.ProductOwner.model.Owner;


public interface OwnerRepository extends JpaRepository<Owner, Long> {

}
