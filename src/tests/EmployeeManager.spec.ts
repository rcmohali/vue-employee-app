import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import EmployeeManager from "../components/EmployeeManager.vue";

describe("EmployeeManager", () => {
  it("renders employee management title", () => {
    const wrapper = mount(EmployeeManager);

    expect(wrapper.text()).toContain(
      "Employee Management System"
    );
  });

  it("renders initial employees", () => {
    const wrapper = mount(EmployeeManager);

    expect(wrapper.text()).toContain("Rahul");
    expect(wrapper.text()).toContain("Priya");
    expect(wrapper.text()).toContain("Amit");
  });

  it("shows total employee count", () => {
    const wrapper = mount(EmployeeManager);

    expect(wrapper.text()).toContain(
      "Total Employees: 3"
    );
  });

  it("adds a new employee", async () => {
    const wrapper = mount(EmployeeManager);

    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("Rohit");
    await inputs[1].setValue("Engineering");

    await wrapper
      .find("button")
      .trigger("click");

    expect(wrapper.text()).toContain("Rohit");
    expect(wrapper.text()).toContain(
      "Engineering"
    );

    expect(wrapper.text()).toContain(
      "Total Employees: 4"
    );
  });

  it("does not add employee with empty fields", async () => {
    const wrapper = mount(EmployeeManager);

    await wrapper
      .find("button")
      .trigger("click");

    expect(wrapper.text()).toContain(
      "Total Employees: 3"
    );
  });

  it("clears form after adding employee", async () => {
    const wrapper = mount(EmployeeManager);

    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("Vikas");
    await inputs[1].setValue("Support");

    await wrapper
      .find("button")
      .trigger("click");

    expect(
      (inputs[0].element as HTMLInputElement)
        .value
    ).toBe("");

    expect(
      (inputs[1].element as HTMLInputElement)
        .value
    ).toBe("");
  });

  it("filters employees by name", async () => {
    const wrapper = mount(EmployeeManager);

    const searchInput =
      wrapper.findAll("input")[2];

    await searchInput.setValue("Rahul");

    expect(wrapper.text()).toContain("Rahul");
    expect(wrapper.text()).not.toContain(
      "Priya"
    );
  });

  it("filters employees by department", async () => {
    const wrapper = mount(EmployeeManager);

    const searchInput =
      wrapper.findAll("input")[2];

    await searchInput.setValue("Finance");

    expect(wrapper.text()).toContain("Amit");
    expect(wrapper.text()).not.toContain(
      "Rahul"
    );
  });

  it("shows empty state when no employee matches search", async () => {
    const wrapper = mount(EmployeeManager);

    const searchInput =
      wrapper.findAll("input")[2];

    await searchInput.setValue("Testing123");

    expect(wrapper.text()).toContain(
      "No employees found"
    );
  });
});