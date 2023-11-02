import Modal from "@/components/ui/Modal";
import Flatpickr from "react-flatpickr";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";


const AddFormer = ({
  activeModal,
  onClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  startDate,
  endDate,
}) => {
  return (
    <Modal activeModal={activeModal} onClose={onClose} title="Add Promotion">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textinput
            name="title"
            label="Promotion Name"
            placeholder="Promotion Name"
            register={register}
            error={errors.title}
          />
          <FormGroup label="Date Dube" id="date-dube" error={errors.date_dube}>
            <Controller
              name="date_dube"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  className="form-control py-2"
                  id="date_dube"
                  placeholder="yyyy, dd M"
                  value={startDate} // Make sure you define startDate in your component state
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              )}
            />
          </FormGroup>
          <FormGroup label="Date Fin" id="date-fin" error={errors.date_fin}>
            <Controller
              name="date_fin"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  className="form-control py-2"
                  id="date_fin"
                  placeholder="yyyy, dd M"
                  value={endDate} // Make sure you define endDate in your component state
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              )}
            />
          </FormGroup>
          <Textinput
            name="status"
            label="Status"
            placeholder="Status"
            register={register}
            error={errors.title}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Add</button>
          </div>
      </form>
    </Modal>
  );
};

export default AddFormer;
