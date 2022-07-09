package target.ProductOwner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import target.ProductOwner.exception.ResourceNotFoundException;
import target.ProductOwner.model.Owner;
import target.ProductOwner.repository.OwnerRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepository;

    // get all owners
    @GetMapping("/owners")
    public List<Owner> getAllOwners(){
        return ownerRepository.findAll();
    }

    // create owner
    @PostMapping("/owners")
    public Owner createOwner(@RequestBody Owner owner){
        return ownerRepository.save(owner);
    }

    // get owner by id
    @GetMapping("/owners/{id}")
    public ResponseEntity<Owner> getOwnerById(@PathVariable Long id){
        Owner owner = ownerRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("Owner does not exist with id: "+id));

        return ResponseEntity.ok(owner);
    }

    // update owner
    @PutMapping("/owners/{id}")
    public ResponseEntity<Owner> updateOwner(@PathVariable Long id, @RequestBody Owner ownerDetails){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );

        owner.setOwnerName(ownerDetails.getOwnerName());
        owner.setProductId(ownerDetails.getProductId());
        owner.setProductName(ownerDetails.getProductName());

        Owner updatedOwner = ownerRepository.save(owner);
        return ResponseEntity.ok(updatedOwner);
    }

    // delete owner by id
    @DeleteMapping("/owners/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteOwner(@PathVariable Long id){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );
        ownerRepository.delete(owner);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // get all products for an owner id
    @GetMapping("/owners/{id}/products")
    public List<Owner> getAllProducts(@PathVariable Long id){
        return ownerRepository.findAll();
    }

    // create product by product id
    @PutMapping("/owners/{id}/products/{productId}")
    public ResponseEntity<Owner> updateProduct(@PathVariable Long id, @PathVariable Long productId, @RequestBody Owner ownerDetails){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );

        owner.setProductId(productId);
        owner.setProductName(ownerDetails.getProductName());
        owner.setProductDescription(ownerDetails.getProductDescription());

        Owner updatedOwner = ownerRepository.save(owner);
        return ResponseEntity.ok(updatedOwner);
    }

    // get product by product id
    @GetMapping("/owners/{id}/products/{productId}")
    public ResponseEntity<Owner> getProductById(@PathVariable Long id, @PathVariable Long productId){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );

        return ResponseEntity.ok(owner);
    }

    @PostMapping("/owners/{id}/products/{productId}")
    public ResponseEntity<Owner> createProduct(@PathVariable Long id, @PathVariable Long productId, @RequestBody Owner ownerDetails){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );

        owner.setProductId(productId);
        owner.setProductName(ownerDetails.getProductName());
        owner.setProductDescription(ownerDetails.getProductDescription());

        Owner updatedOwner = ownerRepository.save(owner);
        return ResponseEntity.ok(updatedOwner);
    }
}
