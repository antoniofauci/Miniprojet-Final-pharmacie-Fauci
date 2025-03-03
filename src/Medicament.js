export class Medicament {
  constructor(MedicamentJSON) {
    this.id = MedicamentJSON.id;
    this.denomination = MedicamentJSON.denomination;
    this.formepharmaceutique = MedicamentJSON.formepharmaceutique;
    this.photo = MedicamentJSON.photo;
    this.qte = MedicamentJSON.qte;
  }

  getImageUrl() {
    return this.photo
      ? `https://apipharmacie.pecatte.fr/images/${this.photo}`
      : "";
  }
}
