import React from 'react';

const Home = () => {
  return (
    <>
      <div className='mx-3 my-4'>
        Vendor Mangaement System helps you to manage all your purchase orders and vendors in one place. It also show you the performance matrix of all the vendors based of their respective management of purchase orders.

        <div className='mt-4'>You can manage the following :</div>
        <b>Vendors</b>
        <ul>
          <li>Create a new vendor  </li>
          <li> Update and delete any vendor </li>
          <li>Get the details of all the vendors</li>
        </ul>

        <b> Purchase Order </b>
        <ul>
          <li>Create a purchase order</li>
          <li>Acknowledge the order</li>
          <li>Updated and delete any pending orders</li>
          <li>Can get list of all the purchase orders</li>
        </ul>
        <b> Performance Matrix </b>
        <ul>
          <li>Can give you the performance matrix of perticular vendor
          </li>
        </ul>
      </div>

    </>
  );
}

export default Home;
