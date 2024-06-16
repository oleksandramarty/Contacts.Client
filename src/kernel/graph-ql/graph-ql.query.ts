import {gql} from "@apollo/client/core";

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: Int!, $input: ContactInputType!) {
    updateContact(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      phone
      title
      middleInitial
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInputType!) {
    createContact(input: $input) {
      id
      firstName
      lastName
      email
      phone
      title
      middleInitial
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    deleteContact(id: $id)
  }
`;

export const GET_CONTACT_BY_ID = gql`
  query GetContactById($id: Int!) {
    contact(id: $id) {
      id
      firstName
      lastName
      email
      phone
      title
      middleInitial
    }
  }
`;

export const GET_FILTERED_CONTACTS = gql`
  query GetFilteredContacts(
    $query: String,
    $isFull: Boolean,
    $pageNumber: Int,
    $pageSize: Int,
    $column: String,
    $direction: String
  ) {
    contacts(
      query: $query,
      isFull: $isFull,
      pageNumber: $pageNumber,
      pageSize: $pageSize,
      column: $column,
      direction: $direction
    ) {
      entities {
        id
        firstName
        lastName
        email
        phone
        title
        middleInitial
      }
      paginator {
        pageNumber
        pageSize
        isFull
      }
      totalCount
    }
  }
`;
