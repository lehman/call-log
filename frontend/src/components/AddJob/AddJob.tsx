import { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input } from 'antd';
import { CreateJob } from '../../api/models';
import './AddJob.css';
import UserContext from '../../api/JobManagementProvider';

const jobFormFields = [
    {
        name: 'company',
        label: 'Company',
        placeholder: 'Company name',
        required: true,
        maxLength: 64,
    },
    {
        name: 'title',
        label: 'Position',
        placeholder: 'Position title',
        required: true,
        maxLength: 64,
    },
    {
        name: 'interviewer',
        label: 'Interviewer',
        placeholder: 'Interviewer name',
        required: true,
        maxLength: 64,
    },
];

export interface IAddJobFormProps {
    visible: boolean | undefined;
    onChange: (values: any) => void;
    onCreate: () => Promise<void>;
    onCancel: () => void;
}

const AddJobForm = ({ visible, onChange, onCreate, onCancel }: IAddJobFormProps) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Add a Job"
            okText="Add Job"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    company: '',
                    title: '',
                    interviewer: '',
                }}
                onValuesChange={(_, values) => {
                    onChange(values);
                }}
            >
                {jobFormFields.map((field) => {
                    return (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={[
                                {
                                    required: field.required,
                                    message: 'Required',
                                },
                                {
                                    max: field.maxLength,
                                    message: `${field.label} can't exceed ${field.maxLength} characters`,
                                },
                            ]}
                        >
                            <Input placeholder={field.placeholder} />
                        </Form.Item>
                    );
                })}
            </Form>
        </Modal>
    );
};

export interface IAddJobProps {
    userId: string;
}

const AddJob = (props: IAddJobProps) => {
    const [visible, setVisible] = useState(false);
    const [jobToAdd, setJobToAdd] = useState<CreateJob>({
        company: '',
        title: '',
        interviewer: '',
        user_id: props.userId,
    });

    const userContext = useContext(UserContext);
    if (!userContext) {
        return null;
    }
    const { addJob } = userContext;

    const onCreate = async () => {
        addJob(jobToAdd);
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Add Job
            </Button>
            <AddJobForm
                visible={visible}
                onChange={(values: any) => {
                    setJobToAdd({ ...values, user_id: props.userId });
                }}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default AddJob;
