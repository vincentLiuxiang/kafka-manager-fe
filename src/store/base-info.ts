import { observable, action } from 'mobx';

export interface IProject {
  projectCode: string;
  projectId: string;
  projectName: string;
  tenantId: number;
  tenantName: string;
}

export interface IUserInfo {
  email: string;
  id: string;
  phone: string;
  realUserId: string;
  username: string;
}

class BaseInfo {
  @observable
  public currentProject: IProject;

  @observable
  public userInfo: IUserInfo;

  @action.bound
  public init(project: IProject, userInfo: IUserInfo) {
    this.currentProject = project;
    this.userInfo = userInfo;
  }
}

export const baseInfo = new BaseInfo();
