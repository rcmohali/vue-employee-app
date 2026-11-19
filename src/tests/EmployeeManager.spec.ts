import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import EmployeeManager from "../components/EmployeeManager.vue";

describe("EmployeeManager", () => {
  it("renders the page title", () => {
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

  it("adds a new employee", async () => {
    const wrapper = mount(EmployeeManager);

    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("John");
    await inputs[1].setValue("Engineering");

    const addButton = wrapper.find("button");

    await addButton.trigger("click");

    expect(wrapper.text()).toContain("John");
    expect(wrapper.text()).toContain("Engineering");
  });

  it("clears form after adding employee", async () => {
    const wrapper = mount(EmployeeManager);

    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("John");
    await inputs[1].setValue("Engineering");

    await wrapper.find("button").trigger("click");

    expect(
      (inputs[0].element as HTMLInputElement).value
    ).toBe("");

    expect(
      (inputs[1].element as HTMLInputElement).value
    ).toBe("");
  });

  it("filters employees based on search", async () => {
    const wrapper = mount(EmployeeManager);

    const searchInput =
      wrapper.find(".search-input");

    await searchInput.setValue("Rahul");

    expect(wrapper.text()).toContain("Rahul");
    expect(wrapper.text()).not.toContain("Priya");
  });

  it("shows empty state when no employee matches search", async () => {
    const wrapper = mount(EmployeeManager);

    const searchInput =
      wrapper.find(".search-input");

    await searchInput.setValue("XYZ123");

    expect(wrapper.text()).toContain(
      "No employees found"
    );
  });

  it("does not add employee when fields are empty", async () => {
    const wrapper = mount(EmployeeManager);

    const initialRows =
      wrapper.findAll("tbody tr").length;

    await wrapper.find("button").trigger("click");

    const finalRows =
      wrapper.findAll("tbody tr").length;

    expect(finalRows).toBe(initialRows);
  });
});