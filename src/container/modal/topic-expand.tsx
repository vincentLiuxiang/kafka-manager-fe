import * as React from 'react';
import { Modal, Form, Row, Input, Select, Switch } from 'component/antd';
import { modal } from 'store/modal';

const topicFormItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 11,
  },
};

class Topic extends React.Component<any> {
  public state = {
    broker: false,
  };

  public handleSubmit = () => {
    debugger
  }

  public changeBroker = (broker: boolean) => {
    this.setState({
      broker,
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { broker } = this.state;
    return (
      <Modal
        title="Topic 扩容"
        style={{ top: 70 }}
        visible={true}
        onCancel={modal.close}
        maskClosable={false}
        width="50%"
        destroyOnClose={true}
        okText="确定"
        cancelText="取消"
        onOk={this.handleSubmit}
      >
        <Form {...topicFormItemLayout} >
          <Row>
            <Form.Item
              label="Topic 名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入Topic 名称' }],
              })(
                <Input
                  placeholder="请输入Topic 名称"
                  disabled={true}
                />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="集群名称"
            >
              {getFieldDecorator('cluster', {
                rules: [{ required: true, message: '请选择集群' }],
              })(
                <Select disabled={true}/>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="负责人"
            >
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请输入负责人' }],
              })(
                <Input disabled={true}/>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="保存时间"
            >
              {getFieldDecorator('save_time', {
                rules: [{ required: true, message: '请输入保存时间' }],
              })(
                <Input disabled={true}/>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="预估每秒峰值流量"
            >
              {getFieldDecorator('flowPerSecond', {
                rules: [{ required: true, message: '请输入预估每秒峰值流量' }],
              })(
                <Input disabled={true}/>,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="分区数"
            >
              {getFieldDecorator('partition_num', {
                rules: [{ required: true, message: '请输入分区数' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="副本数"
            >
              {getFieldDecorator('copy_num', {
                rules: [{ required: true, message: '请输入分区数' }],
              })(
                <Input />,
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Broker 类型"
            >
              <Switch checked={broker} onChange={this.changeBroker}/>
            </Form.Item>
          </Row>
          {
            broker ?
            <Row>
              <Form.Item
                label="region"
              >
                {getFieldDecorator('copy_num', {
                  rules: [{ required: true, message: '请选择 region' }],
                })(
                  <Select />,
                )}
              </Form.Item>
            </Row>
            : null
          }
          <Row>
            <Form.Item
              label="扩展分区说明"
            >
              {getFieldDecorator('buss_desc', {
                rules: [{ required: true, message: '请输入扩展分区说明' }],
              })(
                <Input.TextArea style={{ height: 100 }}/>,
              )}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'topic' })(Topic);
