/*
 * SPDX-License-Identifier:    GPL-3.0
 */

pragma solidity 0.8.10;

import "../core/acl/ACL.sol";
import "../core/IDAO.sol";

contract DAOMock is IDAO, ACL {

    mapping(uint256 => uint256) public totalSupply;
    mapping(address => mapping(uint256 => uint256)) public pastVotes;

    constructor(address initialOwner) {
        ACL.initACL(initialOwner);
    }
    
    function hasPermission(
        address /* _where */ , 
        address /* _who */, 
        bytes32 /* _role */ , 
        bytes memory /* _data */
    ) public pure override returns(bool) {
        return true;
    }

    function setMetadata(bytes calldata /* _metadata */) external override {

    }

    function addProcess(Process /* _process */) external override {

    }

    function removeProcess(Process /* _process */) external override {
        
    }

    function execute(Action[] memory  _actions) external override {
        bytes[] memory results;
        emit Executed(msg.sender, _actions, results);
    }

    function deposit(
        address /* _token */, 
        uint256 /* _amount */, 
        string calldata /* _reference */
    ) external override payable {
        
    }

    function withdraw(
        address /* _token */, 
        address /* _to */, 
        uint256 /* _amount */, 
        string memory  /* _reference */
    ) public override {
       
    }

}