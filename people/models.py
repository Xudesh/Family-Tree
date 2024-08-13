from django.db import models
from django.core.validators import FileExtensionValidator



class Genus(models.Model):
    genus = models.CharField(max_length=50, verbose_name="Ruw")

    def __str__(self) :
        return self.genus
    
    class Meta:
        verbose_name = 'Род'
        verbose_name_plural = 'Родословие'


class People(models.Model):
    genus = models.ForeignKey(Genus, on_delete=models.PROTECT, related_name='people_genus', null=True, blank=True)
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    father_name = models.CharField(max_length=100, verbose_name="Отчество")

    spouse = models.ForeignKey("self", on_delete=models.SET_NULL, verbose_name="Муж/Жена", related_name='people_spouse', null=True, blank=True)
    children = models.ManyToManyField("self", verbose_name="Дети", symmetrical=False, related_name='people_children', null=True, blank=True)

    date_of_birth = models.DateField(auto_now_add=False, verbose_name="Дата рождения")
    date_of_death = models.DateField(auto_now_add=False, verbose_name="Дата Смерти", null=True, blank=True)
    
    photo = models.ImageField(upload_to=f"Family/photo/", validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png'])])

    def __str__(self):
        return self.first_name
    
    class Meta:
        verbose_name = 'Человека '
        verbose_name_plural = 'Люди'