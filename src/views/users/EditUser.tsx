import { useQuery, gql, useMutation } from '@apollo/client';
import { PageHeader, Spin } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router';
import UserForm from '../../components/users/UserForm';
import CONFIGURATION from '../../configuration';
import DefaultLayout from '../../layouts/DefaultLayout';
import { ReadUserQuery, ReadUserQueryVariables, UpdateUserMutation, UpdateUserMutationVariables, IndexUsersQuery, UserInput } from '../../../graphql-types';
import { INDEX_USERS } from './ListUsers';

export const READ_USER = gql`
  query ReadUser($id: Int!) {
    users(id: $id) {
      id
      email
      name
      superuser
      nickname
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $user: UserInput!) {
    users {
      updateUser(id: $id, user: $user) {
        user {
          id
          email
          name
          nickname
          superuser
        }
      }
    }
  }
`;

export default function EditUser() {
  const { id } = useParams();
  const intl = useIntl();
  const navigate = useNavigate();
  const { loading, data } = useQuery<ReadUserQuery, ReadUserQueryVariables>(READ_USER, { variables: { id: parseInt(id || '0') } });
  const [updateUserMutation, { loading: mutating }] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UPDATE_USER, {
    update: (cache, { data }) => {
      const currentUsers = cache.readQuery<IndexUsersQuery>({ query: INDEX_USERS });
      cache.writeQuery({
        query: INDEX_USERS,
        data: { users: currentUsers?.users?.map((user) => (user.id === data?.users?.updateUser?.user.id ? data.users.updateUser.user : user)) }
      });
    }
  });

  const saveUser = (user: UserInput) => {
    const currentUser = data?.users?.find((user) => user);
    if (currentUser?.id) {
      updateUserMutation({ variables: { user, id: currentUser.id } }).then(() => {
        navigate(CONFIGURATION.paths.users);
      });
    }
  };

  return (
    <DefaultLayout
      pageHeader={
        <PageHeader
          title={intl.formatMessage({ id: 'label.user-management' })}
          subTitle={intl.formatMessage({ id: 'label.edit-user' })}
          onBack={() => navigate(CONFIGURATION.paths.users)}
        />
      }
    >
      {data ? <UserForm save={saveUser} loading={loading || mutating} initialUser={data?.users?.find((user) => user)} /> : <Spin />}
    </DefaultLayout>
  );
}
