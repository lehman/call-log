import { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input } from 'antd';
import { CreateUser } from '../../api/models';
import './AddUser.css';
import UserContext from '../../api/JobManagementProvider';

const userFormFields = [
    {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        required: true,
        maxLength: 64,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
        maxLength: 64,
    },
];

export interface IAddUserFormProps {
    visible: boolean | undefined;
    onChange: (values: any) => void;
    onCreate: () => Promise<void>;
    onCancel: () => void;
}

const AddUserForm = ({ visible, onChange, onCreate, onCancel }: IAddUserFormProps) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Add a User"
            okText="Add User"
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
                    name: '',
                    email: '',
                }}
                onValuesChange={(_, values) => {
                    onChange(values);
                }}
            >
                {userFormFields.map((field) => {
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

const AddUser = () => {
    const [visible, setVisible] = useState(false);
    const [userToAdd, setUserToAdd] = useState<CreateUser>({
        name: '',
        email: '',
    });

    const userContext = useContext(UserContext);
    if (!userContext) {
        return null;
    }
    const { addUser } = userContext;

    const onCreate = async () => {
        addUser(userToAdd);
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
                Add User
            </Button>
            <AddUserForm
                visible={visible}
                onChange={(values: any) => {
                    setUserToAdd(values);
                }}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default AddUser;
