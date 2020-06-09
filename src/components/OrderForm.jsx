import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { useCart } from '../utils/useCart';

const Heading = styled.h1`
  ${tw`text-3xl font-bold px-3 pt-4`}
  color: #D45D27;
`;

const Input = styled.input`
  border-radius: 1rem;
  border-color: ${(p) => ((p.error && p.error.type === 'required') ? '#de0000' : '#F2E0AB;')};
  ${tw`h-12 px-4 border-2 focus:outline-none`}
`;

const Form = styled.form`
  ${tw`flex flex-col px-3`}
`;

const FieldLabel = styled.label`
  ${tw`pt-4 pb-1 text-xl`}
`;

const OrderFormButton = styled.input`
  border-radius: 1rem;
  background-color: #D45D27;
  ${tw`mt-4 mx-auto text-white w-40 h-10 uppercase`}
`;

const OrderForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const [displayForm, toggleDisplayForm] = useState(true);
  const { itemsCount, clearCart } = useCart();
  const submitForm = (data) => {
    toggleDisplayForm(false);
    clearCart();
    onSubmit(data);
  };
  if (!displayForm) {
    return <Heading>Thank you for the order!</Heading>;
  }
  if (itemsCount === 0) {
    return <div>Add some pizzas to your cart first!</div>;
  }
  return (
    <>
      <Heading>Complete your order:</Heading>
      <Form onSubmit={handleSubmit(submitForm)}>
        <FieldLabel>Your first name:</FieldLabel>
        <Input type="text" error={errors && errors['First name']} name="First name" ref={register({ required: { value: true, message: 'this field required' } })} />
        <FieldLabel>Your last name:</FieldLabel>
        <Input type="text" error={errors && errors['Last name']} name="Last name" ref={register({ required: { value: true, message: 'this field required' } })} />
        <FieldLabel>Delivery address:</FieldLabel>
        <Input type="text" error={errors && errors.Address} name="Address" ref={register({ required: { value: true, message: 'this field required' } })} />
        <FieldLabel>Mobile number:</FieldLabel>
        <Input
          type="tel"
          error={errors && errors['Mobile number']}
          name="Mobile number"
          ref={register({
            required: { value: true, message: 'this field required' },
          })}
        />

        <OrderFormButton type="submit" />
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default OrderForm;
