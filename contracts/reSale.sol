
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.12;

contract ProductContract {
    struct Product {
        bytes32 productSN;
        bytes32 currentConsumerCode;
        address owner;
        bool isSold;
    }

    mapping(bytes32 => Product) public products;

    function transferOwnership(bytes32 _productSN, bytes32 _newConsumerCode) public {
        require(products[_productSN].isSold, "Product not sold yet");
        require(products[_productSN].currentConsumerCode != _newConsumerCode, "New consumer code must be different");
        require(products[_productSN].owner == msg.sender, "Only the current owner can transfer ownership");

        products[_productSN].currentConsumerCode = _newConsumerCode;
        products[_productSN].owner = msg.sender;
    }

    // Other functions like product registration, selling, etc., can be implemented here
}
