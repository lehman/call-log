import { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input } from 'antd';
import { CreateNote } from '../../api/models';
import UserContext from '../../api/JobManagementProvider';

const noteFormFields = [
    {
        name: 'text',
        label: 'Note',
        placeholder: 'Jot down any notes here!',
        required: true,
        maxLength: 256,
    },
];

export interface IAddNoteFormProps {
    visible: boolean | undefined;
    onChange: (values: any) => void;
    onCreate: () => Promise<void>;
    onCancel: () => void;
}

const AddNoteForm = ({ visible, onChange, onCreate, onCancel }: IAddNoteFormProps) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Add a Note"
            okText="Add Note"
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
                    text: '',
                }}
                onValuesChange={(_, values) => {
                    onChange(values);
                }}
            >
                {noteFormFields.map((field) => {
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
                            <Input.TextArea placeholder={field.placeholder} />
                        </Form.Item>
                    );
                })}
            </Form>
        </Modal>
    );
};

export interface IAddNoteProps {
    jobId: string;
    className?: string;
}

const AddNote = (props: IAddNoteProps) => {
    const [visible, setVisible] = useState(false);
    const [noteToAdd, setNoteToAdd] = useState<CreateNote>({
        job: props.jobId,
        text: '',
    });

    const userContext = useContext(UserContext);
    if (!userContext) {
        return null;
    }
    const { addNote } = userContext;

    const onCreate = async () => {
        addNote(noteToAdd);
        setVisible(false);
    };

    return (
        <div className={props.className}>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Add Note
            </Button>
            <AddNoteForm
                visible={visible}
                onChange={(values: any) => {
                    setNoteToAdd({ ...values, job: props.jobId });
                }}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default AddNote;
