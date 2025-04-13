from setuptools import setup, find_packages

setup(
    name="sprawdzian_Hubert_Przybysz_4C",
    version="1.0",
    packages=find_packages(),
    package_data={
        'sprawdzian_Hubert_Przybysz_4C': ['data/*.txt'],
    },
    author="Hubert Przybysz"
)