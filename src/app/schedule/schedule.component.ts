import { Component } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
    public scheduleData: any;
    currentDate;
    noDrag = false;
    noPopup = false;
    persistence = true;
    responsive = true;
    area = 'body';
    template;
    vehicles;
    filteredVehicles;
    drivers;
    fields;
    dataSource;
    filters = {
        seat: [],
        model: [],
        service: []
    };

    constructor() {
        this.currentDate = new Date();
        this.template = '#apptemplate';

        this.scheduleData = [
            { Id: 100, Vehicle: { 'name': 'Vehicle 1', 'type': 'vehicle', seat: 25, 'model_name': 'Hyundai County', service: 'Premium' }, Subject: "Bering Sea Gold", StartTime: new Date(2017, 4, 24, 12, 15), EndTime: new Date(2017, 4, 24, 13, 45), Description: "", AllDay: false, Recurrence: false, Categorize: "1,3" },
            { Id: 101, Subject: "Bering Sea Gold", StartTime: new Date(2017, 4, 24, 13, 0), EndTime: new Date(2017, 4, 24, 14, 30), Description: "", AllDay: false, Recurrence: false, Categorize: "2,5" },
            { Id: 102, Subject: "What Happened Next?", StartTime: new Date(2017, 4, 4, 1, 0), EndTime: new Date(2017, 4, 4, 1, 30), Description: "", AllDay: false, Recurrence: false, Categorize: "3,6" }];

        this.vehicles = [
            { 'name': 'Vehicle 1', 'type': 'vehicle', seat: 25, 'model_name': 'Hyundai County', service: 'Premium' },
            { 'name': 'Vehicle 2', 'type': 'vehicle', seat: 50, 'model_name': 'Nissan Urvan', service: 'Premium' },
            { 'name': 'Vehicle 3', 'type': 'vehicle', seat: 25, 'model_name': 'Hiace', service: 'Economy' },
            { 'name': 'Vehicle 4', 'type': 'vehicle', seat: 4, 'model_name': 'Toyota Corolla', service: 'Economy' },
            { 'name': 'Vehicle 5', 'type': 'vehicle', seat: 4, 'model_name': 'Nissan Ultima', service: 'Premium' },
            { 'name': 'Vehicle 6', 'type': 'vehicle', seat: 25, 'model_name': 'Hyundai County', service: 'Premium' },
            { 'name': 'Vehicle 7', 'type': 'vehicle', seat: 25, 'model_name': 'Hyundai County', service: 'Premium' }
        ];
        this.drivers = [
            { 'name': 'Driver 1', 'type': 'driver' },
            { 'name': 'Driver 2', 'type': 'driver' },
            { 'name': 'Driver 3', 'type': 'driver' },
            { 'name': 'Driver 4', 'type': 'driver' },
            { 'name': 'Driver 5', 'type': 'driver' },
            { 'name': 'Driver 6', 'type': 'driver' },
            { 'name': 'Driver 7', 'type': 'driver' },
        ];

        this.dataSource = [
            { id: 1, name: "Seating Capacity", hasChild: true },
            { id: 2, pid: 1, name: 4 },
            { id: 3, pid: 1, name: 25 },
            { id: 4, pid: 1, name: 50 },
            { id: 5, name: "Service", hasChild: true },
            { id: 6, pid: 5, name: "Economy" },
            { id: 7, pid: 5, name: "Premium" },
            { id: 8, name: "Model", hasChild: true },
            { id: 9, pid: 8, name: "Van", hasChild: true },
            { id: 10, pid: 9, name: "Hyundai County" },
            { id: 11, pid: 9, name: "Nissan Urvan" },
            { id: 12, pid: 9, name: "Hiace" },
            { id: 13, pid: 8, name: "Car", hasChild: true },
            { id: 14, pid: 13, name: "Toyota Corolla" },
            { id: 15, pid: 13, name: "Nissan Ultima" }
        ];
        this.fields = {
            id: 'id',
            text: "name",
            parentId: "pid",
            hasChild: true,
            dataSource: this.dataSource
        }

        this.filteredVehicles = this.vehicles;

    }

    ngAfterViewInit() {
        $(document).on("click", ".remove-item", (ev) => {
            ev.stopImmediatePropagation()
            var scheduleObj = $("#Schedule4").data("ejSchedule");

            var appointments = scheduleObj.getAppointments();

            var template = $(ev.target).closest('.appointment-template');
            var appointmentId = template.data('id');

            var itemIndex = _.findIndex(this.scheduleData, { Id: appointmentId });
            var appointment = appointments[itemIndex];
            if ($(ev.currentTarget).parents('.vehicle-box').length != 0) {
                $(ev.currentTarget).closest('.e-appointment').removeClass('vehicle-added');
                delete appointment.Vehicle;
            }
            else if ($(ev.currentTarget).parents('.driver-box').length != 0) {
                $(ev.currentTarget).closest('.e-appointment').removeClass('driver-added')
                delete appointment.Driver;
            }
            scheduleObj.saveAppointment(appointment)
        });

        $(document).on("click", ".item-box", (ev) => {
            if (!$(ev.currentTarget).hasClass('remove-item')) {
                var scheduleObj = $("#Schedule4").data("ejSchedule");
                var content;
                var appointments = scheduleObj.getAppointments();

                var template = $(ev.target).closest('.appointment-template');
                var appointmentId = template.data('id');

                var itemIndex = _.findIndex(this.scheduleData, { Id: appointmentId });
                var appointment = appointments[itemIndex];
                if ($(ev.currentTarget).hasClass('vehicle-box')) {
                    content = 'Vehicle: ' + appointment.Vehicle.name;
                }
                else if ($(ev.currentTarget).hasClass('driver-box')) {
                    content = 'Driver: ' + appointment.Driver.name;
                }

                var tooltipObj = $(ev.currentTarget).ejTooltip({
                    content: content,
                    showRoundedCorner: true,
                    trigger: 'click'
                }).data('ejTooltip');
                tooltipObj.show();
            }
        });
    }

    onDragOver(event) {
        var appointmentElement = $(event.target).closest('.e-appointment');
        if ($(event.target).parents('.e-appointment').length != 0) {
            appointmentElement.addClass('hover')
        }
        else {
            $('.e-appointment').removeClass('hover');
        }
    }
    
    onDropped(event) {
        if ($(event.nativeEvent.target).parents('.e-appointment').length != 0) {
            var scheduleObj = $("#Schedule4").data("ejSchedule");

            var appointments = scheduleObj.getAppointments()
            var appointmentElement = $(event.nativeEvent.target).closest('.e-appointment');
            var template = $(event.nativeEvent.target).closest('.appointment-template');
            var appointmentId = template.data('id');
            $('.e-appointment').removeClass('hover');
            var data = event.dragData;
            var appointment;
            var itemIndex = _.findIndex(this.scheduleData, { Id: appointmentId });
            appointment = appointments[itemIndex];
            if (data.type == 'driver') {
                appointmentElement.addClass('driver-added');
                appointment.Driver = data;
            }
            else if (data.type == 'vehicle') {
                appointmentElement.addClass('vehicle-added');
                appointment.Vehicle = data;
            }
            else {
                return;
            }
            scheduleObj.saveAppointment(appointment);

        }
    }

    nodeOnChange(event) {
        this.filters.model = [];
        this.filters.seat = [];
        this.filters.service = [];
        this.processNodes(event.model.checkedNodes);
        this.filterVehicles();
    }

    processNodes(nodes) {
        nodes.forEach(item => {
            if (item >= 0) {
                if (!this.dataSource[item].hasChild) {
                    var parentId = this.getOriginalParentId(this.dataSource[item].pid);
                    this.setFilter(item, parentId)
                }
            }
        });
    }

    setFilter(item, parentId) {
        var parentItem = _.find(this.dataSource, { id: parentId })
        if (parentItem.name == 'Model') {
            this.filters.model.push(this.dataSource[item].name);
        }
        else if (parentItem.name == 'Seating Capacity') {
            this.filters.seat.push(this.dataSource[item].name);
        }
        else if (parentItem.name == 'Service') {
            this.filters.service.push(this.dataSource[item].name);
        }
    }

    getOriginalParentId(pid) {
        var parentItem = _.find(this.dataSource, { id: pid });
        if (parentItem.pid) {
            return this.getOriginalParentId(parentItem.pid);
        }
        return parentItem.id;
    }

    getChildren(id) {
        var children = _.filter(this.dataSource, { pid: id });
        if (children.length == 1 && children.hasChild) {
            return this.getChildren(children.id)
        }
        return children;
    }

    filterVehicles() {
        var result = this.vehicles;
        var items;
        if (this.filters.model.length) {
            result = _.filter(result, (vehicle) => {
                return _.includes(this.filters.model, vehicle.model_name)
            });
        }

        if (this.filters.seat.length) {
            result = _.filter(result, (vehicle) => {
                return _.includes(this.filters.seat, vehicle.seat)
            });
        }

        if (this.filters.service.length) {
            result = _.filter(result, (vehicle) => {
                return _.includes(this.filters.service, vehicle.service)
            });
        }

        this.filteredVehicles = result;
    }
}
