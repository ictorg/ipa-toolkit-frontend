import { gql, useQuery } from '@apollo/client';
import { Button, PageHeader, Table, TableColumnType } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { IndexDossiersQuery } from '../../../graphql-types';
import SingleAssignmentModal from './assignment/SingleAssignmentModal';
import DefaultLayout from '../../layouts/DefaultLayout';
import { Unarray } from '../../utils/types';

const INDEX_DOSSIERS = gql`
  query IndexDossiers {
    dossiers {
      id
      candidate {
        forename
        surname
        id
      }
      conference {
        name
      }
      submittedMark
      markDeduction
      dossierDownloadPath
    }
  }
`;

type AssignmentTable = Unarray<NonNullable<IndexDossiersQuery['dossiers']>>;

export default function VerificationAssignment() {
  const intl = useIntl();
  const { loading, data } = useQuery<IndexDossiersQuery>(INDEX_DOSSIERS);

  const columns: TableColumnType<AssignmentTable>[] = [
    {
      dataIndex: 'id',
      key: 'id',
      title: intl.formatMessage({ id: 'attribute.id' })
    },
    {
      dataIndex: ['candidate', 'forename'],
      key: 'candidateForename',
      title: intl.formatMessage({ id: 'label.candidate-forename' })
    },
    {
      dataIndex: ['candidate', 'surname'],
      key: 'candidateSurname',
      title: intl.formatMessage({ id: 'label.candidate-surname' })
    },
    {
      dataIndex: 'submittedMark',
      key: 'submittedMark',
      title: intl.formatMessage({ id: 'attribute.submittedMark' })
    },
    {
      dataIndex: 'markDeduction',
      key: 'markDeduction',
      title: intl.formatMessage({ id: 'attribute.markDeduction' }),
      render: (value: boolean) => (value ? intl.formatMessage({ id: 'label.yes' }) : intl.formatMessage({ id: 'label.no' }))
    },
    {
      dataIndex: ['conference', 'name'],
      key: 'conferenceName',
      title: intl.formatMessage({ id: 'label.grading-conference' })
    },
    {
      key: 'actions',
      title: intl.formatMessage({ id: 'label.actions' }),
      align: 'center',
      render: (_value, record) => (
        <Fragment>
          <Button.Group>
            {record.dossierDownloadPath ? <Button href={record.dossierDownloadPath} icon={<CloudDownloadOutlined />} /> : null}
            <SingleAssignmentModal dossierId={record.id} />
          </Button.Group>
        </Fragment>
      )
    }
  ];

  return (
    <DefaultLayout pageHeader={<PageHeader title={intl.formatMessage({ id: 'label.verification' })} subTitle={intl.formatMessage({ id: 'label.assignment' })} />}>
      <Table<AssignmentTable> columns={columns} dataSource={data?.dossiers ?? []} loading={loading} />
    </DefaultLayout>
  );
}
